import { LightningElement, api, track } from 'lwc';

const FIRST_PAGE = 1;

export default class Pagination extends LightningElement {

    @api currentPage;
    @api totalRecords;
    @api positionsPerPage;
    @track buttonList = [];


    get totalCountOfPages() {
        return Math.ceil(this.totalRecords / this.positionsPerPage);
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
        return this.currentPage === FIRST_PAGE
    }

    get disableNextButton() {
        return this.currentPage >= this.totalCountOfPages
    }

    handleButtonPress(event) {
        this.currentPage = event.target.label;
        this.doPaginate();
    }

    handlePrevious() {
        if (this.currentPage > FIRST_PAGE) {
            this.currentPage = this.currentPage - 1;
            this.doPaginate();
        }
    }

    handleNext() {
        if (this.currentPage < this.totalCountOfPages) {
            this.currentPage = Number(this.currentPage) + 1;
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