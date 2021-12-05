import { LightningElement, api, wire, track } from 'lwc';
import getAllPositions from '@salesforce/apex/PositionControllerLWC.getAllPositions';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import STATUS_FIELD from '@salesforce/schema/Position__c.Status__c';
import updatePositions from '@salesforce/apex/PositionControllerLWC.updatePositions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';


export default class PositionsLWC extends LightningElement {
    @track selectedStatus = '_%';
    @api allPositions;
    @track error;
    @track statusValues;
    @track fieldStatus;
    @track positionsToDisplay;
    @api positionsOnPage = 5;

    connectedCallback() {
       
        this.getPositionsList();

    }

    getPositionsList() {
        getAllPositions({ selectedStatus: this.selectedStatus })
            .then(result => { this.allPositions = result;})
            .catch(error => { this.error = error; })

    }

    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: STATUS_FIELD
    }) wiredStatusValues({ error, data }) {
        if (data) {
            this.statusValues = data.values
            this.fieldStatus = data.values
            this.statusValues = Object.assign([], this.statusValues)
            this.statusValues.unshift({ label: 'All', value: '_%' });
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
        this.positionsToDisplay = [...event.detail.records]
        console.log(event.detail.records)

    }

}





