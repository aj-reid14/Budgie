import React from "react";
import { Input } from "../Form";
import "./style.css";
import { Container, Row } from "../Grid";

export default function NewBudgetModal() {
    return (
        <div>
            <div id="new-budget-modal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Create New Budget</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <form>
                                <Container>
                                    <div className="row modal-content-group">
                                        <div className="form-group col-md-8">
                                            <label htmlFor="budget-name" className="col-form-label">Budget Name</label>
                                            <input type="text" className="form-control" id="budget-name"></input>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label htmlFor="budget-total" className="col-form-label">Total ($)</label>
                                            <input type="text" className="form-control" id="budget-total"></input>
                                        </div>
                                    </div>
                                    <div className="row modal-content-group">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="category-name" className="col-form-label">Category Name</label>
                                            <input type="text" className="form-control" id="category-name"></input>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="category-amount" className="col-form-label">Amount ($)</label>
                                            <input type="text" className="form-control" id="budget-total"></input>
                                        </div>
                                        <button id="btn-add-category" type="button" class="btn btn-primary">Add</button>
                                    </div>
                                    <Row>
                                        <table width="100%">
                                            <tbody>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Row>

                                </Container>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}