import { LightningElement, api, wire, track } from 'lwc';
import getAllPositions from '@salesforce/apex/PositionControllerLWC.getAllPositions';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import POSITION_OBJECT from '@salesforce/schema/Position__c';
import STATUS_FIELD from '@salesforce/schema/Position__c.Status__c';
import updatePositions from '@salesforce/apex/PositionControllerLWC.updatePositions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getTotalNumberOfPositions from '@salesforce/apex/PositionControllerLWC.getTotalNumberOfPositions';
import { NavigationMixin } from 'lightning/navigation';



export default class PositionsLWC extends NavigationMixin(LightningElement) {

    @track selectedStatus = '_%';
    @track allPositions;
    @track error;
    @track statusValues = [{ label: 'All', value: '_%' }];
    @track fieldStatus;
    @api positionsOnPage = 0;
    @track offsetPositions = 0;
    @track pageNumber = 1;
    totalNumberOfPositions = 0;
    @track objectInfo;


    connectedCallback() {

        this.loadPositionsList();
        

    }

    navigateToPosition(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.dataset.id,
                actionName: 'view'
            }
        });
    }

    loadPositionsList() {
        getTotalNumberOfPositions({ selectedStatus: this.selectedStatus })
            .then(result => {
                this.totalNumberOfPositions = result
            });

        this.offsetPositions = (this.pageNumber - 1) * this.positionsOnPage;

        getAllPositions({
            selectedStatus: this.selectedStatus,
            positionsOnPage: this.positionsOnPage,
            offsetPositions: this.offsetPositions
        })
            .then(result => {
                this.allPositions = result
            })
            .catch(error => {
                this.error = error;
            })

    }

    @wire(getObjectInfo, { objectApiName: POSITION_OBJECT })
    objectInfo;

    @wire(getPicklistValues, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName: STATUS_FIELD
    }) wiredStatusValues({ error, data }) {
        if (data) {
            this.statusValues = [...this.statusValues, ...data.values];
            this.fieldStatus = data.values;
            if (error) {
                console.error(error)
            }
        }
    }

    handleChange(event) {
        this.selectedStatus = event.detail.value;
        this.pageNumber = 1;
        this.loadPositionsList()
    }

    handleFieldStatus(event) {
        this.allPositions[event.target.dataset.index].Status__c = event.detail.value;
    }

    handleSave() {

        updatePositions({
            posList: this.allPositions
        })
            .then(() => {
                const event = new ShowToastEvent({
                    title: 'Success',
                    message: `Positions saved succesfully!`,
                    variant: 'success',
                });
                this.dispatchEvent(event);
                this.selectedStatus = '_%';
                this.pageNumber = 1;
                this.loadPositionsList();

            });
    }

    handlePaginationChange(event) {
        this.pageNumber = event.detail;
        this.loadPositionsList()

    }

}





