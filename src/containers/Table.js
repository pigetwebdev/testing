import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from 'react-modal';
import axios from 'axios';

import {
  deleteTodo,
  editTodo,
  toggleTodo,
  activateTodo,
  setAddEditState,
  setVisibilityFilter,
  initData
} from "../actions/actionCreator";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE  } from "../actions/actionsTypes";
import { bindActionCreators } from "redux";

 const API = "http://localhost:3000/"
 const  DEFAULT_QUERY = 'res/res.json'

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false, selID:0, isLoading: false};
  }
  openModal = () => {
    console.log(this.state);
    console.log("Aaaaaa");
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }
  handleModalCloseRequest = () => {
    // opportunity to validate something and keep the modal open even if it
    // requested to be closed
    this.setState({modalIsOpen: false});
  }

  handleSaveClicked = (e) => {
    console.log("asdasdfasd");
    this.props.deleteTodo(this.selID)
    this.setState({modalIsOpen: false});
  }
  // For Modal Error Fix
  componentWillMount() {
    Modal.setAppElement('body');
  }  
  // Load API Data
  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const result = await axios.get(API + DEFAULT_QUERY);
      console.log(result.data.Products);
      var ret = result.data.Products.map(res => {
        {
            var val = Object.assign({},
                {
                  id: res.id,
                  text: res.name,
                  active: res.active
                }
              )
            return val
        }
      })
      console.log(ret);
//      newtodo = assign
//      this.state.setState({todos: ret,isLoading:false})
      this.props.initData(ret);
      
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  render() {
    //var appElement = document.getElementById('ModalPlace');
    // console.log(appElement);
         
    return (
      <div>
        <div classID="ModalPlace" />
        <Modal
          className="Modal__Bootstrap modal-dialog"
          closeTimeoutMS={150}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleModalCloseRequest}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Confirm</h4>
              <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="modal-body">
              <h4>Do you really want to delete?</h4>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={this.handleModalCloseRequest}>Close</button>
              {/* <button type="button" className="btn btn-primary" onClick={this.handleSaveClicked}>Save changes</button> */}
              <button type="button" className="btn btn-primary" onClick={() => {console.log("DelID:="+this.state.selID);this.props.deleteTodo(this.state.selID); this.setState({modalIsOpen: false});}}>Yes</button>
            </div>
          </div>
        </Modal>           
      
      <div className="col-lg-10 offset-lg-1 col-md-10 col-sm-12 col-xs-12">
             
        <nav style={{ marginTop: "60px" }}>
          <ol className="breadcrumb">
            <li
              className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_ALL ? 'active' : '') }
              onClick={() => this.props.setVisibilityFilter(SHOW_ALL)}
            >
             All
            </li>
            <li
               className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_COMPLETED ? 'active' : '') }
              onClick={() => this.props.setVisibilityFilter(SHOW_COMPLETED)}
            >
              Completed
            </li>
            <li
               className={"breadcrumb-item "+ (this.props.visibilityFilter === SHOW_ACTIVE ? 'active' : '') }
              onClick={() => this.props.setVisibilityFilter(SHOW_ACTIVE)}
            >
              Active
            </li>
          </ol>
        </nav>
        {this.props.todos.length !== 0 ? (
          <table
            style={{ marginTop: "60px" }}
            className="table table-hover table-light"
          >
            <thead>
              <tr>
                <th scope="col">Active</th>
                <th scope="col">Production</th>
                <th scope="col">Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.props.todos.map(todo => (
                <tr key={todo.id}>
                  <td width = "10%">
                  <span
                        className="fas fa-circle"
                        onClick={() => this.props.activateTodo(todo.id)}
                        style={{ color: todo.active ? "black" : "white", fontSize: "20pt" }}
                      />

                  </td>
                  <td width = "70%"
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none"
                    }}
                  >
                    {todo.text} {todo.completed === true ? "(completed)" : ""}
                  </td>
                  <td width = "20">
                    <span
                      className="fas fa-pencil-alt"
                      onClick={() => this.props.setAddEditState(false, todo.id,todo.text)}
                      style={{ color: "black", fontSize: "20pt",marginRight: "20px" }}
                    />
                    <span
                      className="fas fa-trash"
                      onClick={() => {this.state.selID = todo.id;this.setState({modalIsOpen: true})}}
//                      onClick={() => {console.log(this);this.openModal}}
                      style={{
                        color: "black",
                        fontSize: "20pt"
                        
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
            style={{ marginTop: "50px" }}
            className="col-lg-10 col-md-10 col-xs-12 col-sm-12 offset-lg-1"
          >
            <div className="alert alert-danger" role="alert">
              Todo List is empty or Filter results show no results
            </div>
          </div>
        )}{" "}
      </div>
      </div>      
    );
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return todos;
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};
const mapStateToProps = state => {
  return { todos: getVisibleTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
 };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      editTodo,
      deleteTodo,
      toggleTodo,
      activateTodo,
      setVisibilityFilter,
      setAddEditState,
      initData
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
