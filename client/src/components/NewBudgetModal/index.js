import React from "react";
import {Input} from "../Form";
import "./style.css";

export default function NewBudgetModal() {
    return (
        <div>
            <div id="new-budget-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title">Create New Budget</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="budget-name" class="col-form-label">Budget Name</label>
                                    <input type="text" class="form-control" id="budget-name"></input>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}