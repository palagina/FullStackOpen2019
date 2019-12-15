import React from "react";
import { connect } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Search = props => {
  const handleChange = event => {
    props.filterChange(event.target.value);
  };

  return (
    <div>
      <form>
        <input placeholder="Search.." onChange={handleChange} />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  filterChange,
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Search);
export default ConnectedFilter