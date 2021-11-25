import { LightningElement, api, wire, track } from 'lwc';
import getAllPositions from '@salesforce/apex/PositionControllerLWC.getAllPositions';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import STATUS_FIELD from '@salesforce/schema/Position__c.Status__c';



export default class PositionsLWC extends LightningElement {
    @api selectedStatus = '_%';
    @api numberOfRecords = 5;
    @track allPositions;
    @track statusValues;
    
    
      

    @wire(getAllPositions, { selectedStatus: '$selectedStatus', numberOfRecords: '$numberOfRecords'})
    wiredPositions({ error, data }) {
        if (data) {
            this.allPositions = data
            console.log(this.allPositions)
        }
        if (error) {
            console.error(error)
        }
    }


    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: STATUS_FIELD
    }) wiredStatusValues({ error, data }) {
        if (data) {
            console.log(JSON.stringify(data))
            this.statusValues = data.values
            this.statusValues = Object.assign([], this.statusValues)
            this.statusValues.unshift({attributes: null, label: 'All', validFor: Array(0), value: '_%'});
            console.log(this.statusValues)
            if (error) {
                console.error(error)
            }
        }
    }


    handleChange(event) {

        this.selectedStatus = event.detail.value;
        console.log(this.selectedStatus)








    }



}



