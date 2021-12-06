import { LightningElement, api, track } from 'lwc';


export default class Pagination extends LightningElement {

    @api currentPage;
    @api totalRecords;
    @track totalPage = 0;
    @api positionsPerPage;
    @track buttonList = [];

          
    get totalCountOfPages() {
        return this.totalPage = Math.ceil(this.totalRecords / this.positionsPerPage)
    }

    get buttonPageList() {
        this.buttonList = []
        var counter = 1;
        for (counter; counter <= this.totalCountOfPages; counter++) {
            this.buttonList.push(counter);
        }
        return this.buttonList
    }

    get disableButtons() {
        return this.totalCountOfPages <= 1;
    }

    get disablePrevious() {
        return this.currentPage <= 1 || this.totalCountOfPages <= 1
    }

    get disableNext() {
        return this.currentPage >= this.totalCountOfPages || this.totalCountOfPages <= 1
    }

    handleButtonPress(event) {
        this.currentPage = event.target.label;
        this.updateRecords();
    }

    handlePrevious() {
        if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1
            this.updateRecords()
        }
    }

    handleNext() {
        if (this.currentPage < this.totalCountOfPages) {
            this.currentPage = Number(this.currentPage) + 1;
            this.updateRecords()
        }
    }

    updateRecords() {
        this.dispatchEvent(new CustomEvent('paginationchange', {
            detail:
                this.currentPage
        }))
    }

}