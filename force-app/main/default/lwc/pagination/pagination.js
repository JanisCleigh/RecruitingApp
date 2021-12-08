import { LightningElement, api, track } from 'lwc';

const ONEPAGE = 1;

export default class Pagination extends LightningElement {

    @api currentPage;
    @api totalRecords;
    @track totalPage = 0;
    @api positionsPerPage;
    @track buttonList = [];


    get totalCountOfPages() {
        return this.totalPage = Math.ceil(this.totalRecords / this.positionsPerPage);
    }


    get buttonPageList() {
        this.buttonList = [];
        for (let index = 1; index <= this.totalCountOfPages; index++) {
            this.buttonList.push({
                label: index,
                disabled: index === this.currentPage
            });
        }
        return this.buttonList
    }

    get disablePreviousButton() {
        return this.currentPage <= ONEPAGE || this.totalCountOfPages <= ONEPAGE;
    }

    get disableNextButton() {
        return this.currentPage >= this.totalCountOfPages || this.totalCountOfPages <= ONEPAGE;
    }

    handleButtonPress(event) {
        this.currentPage = event.target.label;
        this.doPaginate();
    }

    handlePrevious() {
        if (this.currentPage > ONEPAGE) {
            this.currentPage = this.currentPage - ONEPAGE;
            this.doPaginate();
        }
    }

    handleNext() {
        if (this.currentPage < this.totalCountOfPages) {
            this.currentPage = Number(this.currentPage) + ONEPAGE;
            this.doPaginate();
        }
    }

    doPaginate() {
        this.dispatchEvent(new CustomEvent('paginationchange', {
            detail:
                this.currentPage
        }))
    }

}