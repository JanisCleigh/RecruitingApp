import { LightningElement, api, track } from 'lwc';


export default class Pagination extends LightningElement {

    currentPage = 1
    totalRecords
    @track totalPage = 0
    @api recordsPerPage;
    positionsPerPage
      
    
    get records() {
        return this.visibleRecords
        
    }

    @api
    set records(data) {
        if (data) {
            this.totalRecords = data
            console.log('data ' + data)
            console.log(this.totalRecords)
            console.log('recordsperpage ' + this.recordsPerPage)
            this.totalPage = Math.ceil(data.length / this.recordsPerPage)
            this.updateRecords()
            console.log('get records ' + this.visibleRecords)
        }
    }
    get disablePrevious() {
        return this.currentPage <= 1
    }
    get disableNext() {
        return this.currentPage >= this.totalPage
    }

    handlePageNumberChange(event) {
        if (event.target.value > 0 && event.target.value <= this.totalPage && event.code === "Enter") {
            this.currentPage = event.target.value;
            this.updateRecords()
        }
    }

    handlePrevious() {
        if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1
            this.updateRecords()
        }
    }

    handleNext() {
        if (this.currentPage < this.totalPage) {
            this.currentPage = Number(this.currentPage) + 1;
            this.updateRecords()
        }
    }

    updateRecords() {
        const start = (this.currentPage - 1) * this.recordsPerPage
        const end = this.recordsPerPage * this.currentPage
        this.visibleRecords = this.totalRecords.slice(start, end)
        this.dispatchEvent(new CustomEvent('paginationchange', {
            detail: {
                records: this.visibleRecords
            }
        }))
    }


}