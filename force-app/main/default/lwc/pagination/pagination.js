import { LightningElement, api, track } from 'lwc';


export default class Pagination extends LightningElement {

    @api currentPage;
    @api totalRecords;
    @track totalPage = 0;
    @api positionsPerPage;
    @track buttonList = [];
    @track buttonNumber;


    renderedCallback() {
        this.disableEnableButtons()
    }

    disableEnableButtons() {
        let buttons = this.template.querySelectorAll("lightning-button");
        console.log(buttons)
        buttons.forEach(bun => {
            if (bun.label === this.currentPage) {
                bun.disabled = true;
            } else {
                bun.disabled = false;
            }

            if (bun.label === "Prev") {
                bun.disabled = this.currentPage === 1 ? true : false;
            } else if (bun.label === "Next") {
                bun.disabled = this.currentPage === this.totalCountOfPages || this.totalCountOfPages <= 1 ? true : false;
            }

        })
    }

    get totalCountOfPages() {
        return this.totalPage = Math.ceil(this.totalRecords / this.positionsPerPage);
    }


    get buttonPageList() {
        this.buttonList = [];
        var counter = 1;
        for (counter; counter <= this.totalCountOfPages; counter++) {
            this.buttonList.push(counter);
        }
        return this.buttonList
    }

    get disablePreviousButton() {
        return this.currentPage <= 1 || this.totalCountOfPages <= 1;
    }

    get disableNextButton() {
        return this.currentPage >= this.totalCountOfPages || this.totalCountOfPages <= 1;
    }

    handleButtonPress(event) {
        this.currentPage = event.target.label;
        this.buttonNumber = event.target.label;
        this.doPaginate();
    }

    handlePrevious() {
        if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1;
            this.doPaginate();
        }
    }

    handleNext() {
        if (this.currentPage < this.totalCountOfPages) {
            this.currentPage = Number(this.currentPage) + 1;
            this.disableEnableButtons()
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