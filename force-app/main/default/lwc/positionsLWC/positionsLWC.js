import { LightningElement, api, wire, track } from 'lwc';
import getAllPositions from '@salesforce/apex/PositionControllerLWC.getAllPositions';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import STATUS_FIELD from '@salesforce/schema/Position__c.Status__c';
import updatePositions from '@salesforce/apex/PositionControllerLWC.updatePositions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getTotalNumberOfPositions from '@salesforce/apex/PositionControllerLWC.getTotalNumberOfPositions';


export default class PositionsLWC extends LightningElement {
    @track selectedStatus = '_%';
    @track allPositions;
    @track error;
    @track statusValues = [{ label: 'All', value: '_%' }];
    @track fieldStatus;
    @api positionsOnPage = 0;
    @track offsetPositions = 0;
    @track pageNumber = 1;
    totalNumberOfPositions = 0;


    connectedCallback() {

        this.getPositionsList();

    }

    getPositionsList() {
        getTotalNumberOfPositions({ selectedStatus: this.selectedStatus })
            .then(result => { this.totalNumberOfPositions = result });

        this.offsetPositions = (this.pageNumber - 1) * this.positionsOnPage;

        getAllPositions({ selectedStatus: this.selectedStatus, positionsOnPage: this.positionsOnPage, offsetPositions: this.offsetPositions })
            .then(result => { this.allPositions = result })
            .catch(error => { this.error = error; })

    }

    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: STATUS_FIELD
    }) wiredStatusValues({ error, data }) {
        if (data) {
            this.statusValues = [...this.statusValues, ...data.values]
            this.fieldStatus = data.values;
            if (error) {
                console.error(error)
            }
        }
    }

    handleChange(event) {
        this.selectedStatus = event.detail.value;
        console.log(this.selectedStatus)
        this.getPositionsList()
    }

    handleFieldStatus(event) {
        let element = this.allPositions.find(ele => ele.Id === event.target.dataset.id);
        element.Status__c = event.detail.value;

    }

    handleSave() {

        updatePositions({ posList: this.allPositions })
            .then(() => {
                const event = new ShowToastEvent({
                    title: 'Success',
                    message: `Positions saved succesfully!`,
                    variant: 'success',
                });
                this.dispatchEvent(event);
                this.selectedStatus = '_%';
                refreshApex(this.connectedCallback());
            });
    }

    handlePaginationChange(event) {
        this.pageNumber = event.detail;
        this.getPositionsList()
        console.log(event.detail)
    }

}





