import Details from '@salesforce/schema/RemoteKeyCalloutEvent.Details';
import { LightningElement, api } from 'lwc';


export default class Pagination extends LightningElement {
    allData

    @api recordsPerPage = 10;

    
    @api
   /* set records(data) {
        if (data) {
            this.allData = data;
            this.totalRecords = this.allData.length
            this.visibleRecords = data.slice(0, this.recordsPerPage)
            this.totalPages = Math.ceil(this.totalRecords / this.recordsPerPage);
            this.paginationRecords();

        }
    }*/

    handleNext() {
        this.dispatchEvent(new CustomEvent('next'));

    }

    handlePrevious() {
        this.dispatchEvent(new CustomEvent('previous'));
    }


    
   


}