import { LightningElement, api, track } from 'lwc';

const FIRSTPAGE = 1;

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
        console.log(this.buttonList)
        return this.buttonList
    }

    get disablePreviousButton() {
        return this.currentPage <= FIRSTPAGE || this.totalCountOfPages <= FIRSTPAGE;
    }

    get disableNextButton() {
        return this.currentPage >= this.totalCountOfPages || this.totalCountOfPages <= FIRSTPAGE;
    }

    handleButtonPress(event) {
        this.currentPage = event.target.label;
        this.doPaginate();
    }

    handlePrevious() {
        if (this.currentPage > FIRSTPAGE) {
            this.currentPage = this.currentPage - FIRSTPAGE;
            this.doPaginate();
        }
    }

    handleNext() {
        if (this.currentPage < this.totalCountOfPages) {
            this.currentPage = Number(this.currentPage) + FIRSTPAGE;
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