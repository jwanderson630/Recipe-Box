"use strict";

var rec = [{ "idNum": 0, "name": "Chocolate Chip Cookies", "ing": ["Flour", "Sugar", "Salt", "Eggs", "Chocolate Chips"] }, { "idNum": 1, "name": "Pizza", "ing": ["Flour", "Sugar", "Salt", "Water", "Cheese", "Pizza Sauce"] }, { "idNum": 3, "name": "Pasta", "ing": ["Pasta", "Sauce"] }];
var items = {};
var setStorage = function setStorage() {
  if (localStorage.getItem("_yoej262_item") === "undefined") {
    localStorage.setItem("_yoej262_item", JSON.stringify(rec));
    items = JSON.parse(localStorage.getItem("_yoej262_item"));
  } else {
    items = JSON.parse(localStorage.getItem("_yoej262_item"));
  }
};

setStorage();

var RecipeBox = React.createClass({
  displayName: "RecipeBox",

  getInitialState: function getInitialState() {
    return {
      items: this.props.items,
      idNum: Math.floor(Math.random() * 10000) + 10000,
      newName: ""
    };
  },
  getRecipeName: function getRecipeName(e) {
    this.setState({
      newName: e.target.value
    });
  },
  getIngredientNames: function getIngredientNames(e) {
    this.setState({
      newIngredients: e.target.value.split(",")
    });
  },
  getNewRecipe: function getNewRecipe() {
    var name = this.state.newName;
    if (name === "") {
      name = "Untitled";
    };
    var newRecipe = { "idNum": this.state.idNum, "name": name, "ing": this.state.newIngredients };
    this.setState({
      items: this.state.items.concat([newRecipe]),
      newIngredients: [],
      newName: "",
      idNum: this.state.idNum + 1
    });
  },
  render: function render() {
    localStorage.setItem("_yoej262_item", JSON.stringify(this.state.items));
    return React.createElement(
      "div",
      { className: "container-fluid" },
      React.createElement(
        "h1",
        { className: "title" },
        "Recipe Box:"
      ),
      React.createElement(
        "div",
        { className: "modal fade", id: "addModal", role: "dialog" },
        React.createElement(
          "div",
          { className: "modal-dialog" },
          React.createElement(
            "div",
            { className: "modal-content" },
            React.createElement(
              "div",
              { className: "modal-header" },
              React.createElement(
                "button",
                { type: "button", className: "close", "data-dismiss": "modal" },
                "×"
              ),
              React.createElement(
                "h4",
                null,
                "Add Recipe"
              )
            ),
            React.createElement(
              "div",
              { className: "modal-body" },
              React.createElement(
                "form",
                { role: "from" },
                React.createElement(
                  "div",
                  { className: "form-group" },
                  React.createElement(
                    "label",
                    { "for": "name" },
                    "Name:"
                  ),
                  React.createElement("input", { require: "true", placeholder: "Recipe name", value: this.state.newName, type: "name", className: "form-control", id: "name", onChange: this.getRecipeName })
                ),
                React.createElement(
                  "div",
                  { className: "form-group" },
                  React.createElement(
                    "label",
                    { "for": "ingredients" },
                    "Ingredients:"
                  ),
                  React.createElement("input", { placeholder: "Separate,ingredients,by,commas", type: "ingredients", className: "form-control", require: "true", id: "ingredients", value: this.state.newIngredients, onChange: this.getIngredientNames })
                ),
                React.createElement(
                  "button",
                  { type: "button", className: "btn btn-default", onClick: this.getNewRecipe, "data-dismiss": "modal" },
                  "Submit"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "modal-footer" },
              React.createElement(
                "button",
                { type: "button", className: "btn btn-default", "data-dismiss": "modal" },
                "Close"
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "well" },
        React.createElement(RecipeList, { items: this.state.items })
      ),
      React.createElement(
        "button",
        { onClick: this.addItem, className: "btn btn-primary", "data-toggle": "modal", "data-target": "#addModal" },
        "Add Recipes ",
        React.createElement("span", { className: "glyphicon glyphicon-plus" })
      )
    );
  }
});

var RecipeList = React.createClass({
  displayName: "RecipeList",

  render: function render() {
    var deleteRecipe = function deleteRecipe(index) {
      recipeNodes = recipeNodes.splice(index, 1);
    };
    var recipes = this.props.items;
    var recipeNodes = recipes.map(function (recipe) {
      return React.createElement(WholeRecipe, { recipe: recipe });
    });
    return React.createElement(
      "div",
      { className: "panel-group", id: "accordion" },
      recipeNodes
    );
  }
});

var WholeRecipe = React.createClass({
  displayName: "WholeRecipe",

  getInitialState: function getInitialState() {
    return {
      display: "panel panel-default",
      name: this.props.recipe.name,
      newName: this.props.recipe.name,
      ing: this.props.recipe.ing,
      newIng: this.props.recipe.ing,
      id: this.props.recipe.idNum
    };
  },
  handleClickDelete: function handleClickDelete() {
    var recs = JSON.parse(localStorage.getItem("_yoej262_item"));
    recs.splice(this.state.id, 1);
    localStorage.setItem("_yoej262_item", JSON.stringify(recs));
    this.setState({
      display: "panel panel-default hidden"
    });
  },
  getNewRecipe: function getNewRecipe() {
    this.setState({
      name: this.state.newName,
      ing: this.state.newIng.split(',')
    });
  },
  getRecipeName: function getRecipeName(e) {
    this.setState({
      newName: e.target.value
    });
  },
  getIngredientNames: function getIngredientNames(e) {
    this.setState({
      newIng: e.target.value
    });
  },

  makeIdNew: function makeIdNew() {
    return "Recipe" + this.props.recipe.idNum.toString();
  },
  makeId: function makeId() {
    return "#Recipe" + this.props.recipe.idNum.toString();
  },
  render: function render() {
    return React.createElement(
      "div",
      { className: this.state.display },
      React.createElement(
        "div",
        { className: "modal fade", id: this.makeIdNew(), role: "dialog" },
        React.createElement(
          "div",
          { className: "modal-dialog" },
          React.createElement(
            "div",
            { className: "modal-content" },
            React.createElement(
              "div",
              { className: "modal-header" },
              React.createElement(
                "button",
                { type: "button", className: "close", "data-dismiss": "modal" },
                "×"
              ),
              React.createElement(
                "h4",
                null,
                "Add Recipe"
              )
            ),
            React.createElement(
              "div",
              { className: "modal-body" },
              React.createElement(
                "form",
                { role: "from" },
                React.createElement(
                  "div",
                  { className: "form-group" },
                  React.createElement(
                    "label",
                    { "for": "name" },
                    "Name:"
                  ),
                  React.createElement("input", { require: "true", value: this.state.newName, type: "name", className: "form-control", id: "name", onChange: this.getRecipeName })
                ),
                React.createElement(
                  "div",
                  { className: "form-group" },
                  React.createElement(
                    "label",
                    { "for": "ingredients" },
                    "Ingredients:"
                  ),
                  React.createElement("input", { value: this.state.newIng, type: "ingredients", className: "form-control", require: "true", id: "ingredients", onChange: this.getIngredientNames })
                ),
                React.createElement(
                  "button",
                  { type: "button", className: "btn btn-default", onClick: this.getNewRecipe, "data-dismiss": "modal" },
                  "Submit"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "modal-footer" },
              React.createElement(
                "button",
                { type: "button", className: "btn btn-default", "data-dismiss": "modal" },
                "Close"
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "panel-heading" },
        React.createElement(
          "h4",
          { className: "panel-title" },
          React.createElement(Recipe, { idNum: this.props.recipe.idNum, name: this.state.name, ing: this.state.ing })
        )
      ),
      React.createElement(
        "div",
        { id: this.props.recipe.idNum, className: "panel-collapse collapse" },
        React.createElement(
          "div",
          { className: "panel-body" },
          React.createElement(Ingredients, { ingList: this.state.ing })
        ),
        React.createElement(
          "div",
          { className: "panel-footer" },
          React.createElement(
            "div",
            { className: "btn-group" },
            React.createElement(
              "button",
              { onClick: this.handleClickDelete, className: "btn btn-danger" },
              "Delete"
            ),
            React.createElement(
              "button",
              { className: "btn btn-info", "data-toggle": "modal", "data-target": this.makeId() },
              "Edit"
            )
          )
        )
      )
    );
  }
});

var Recipe = React.createClass({
  displayName: "Recipe",

  makeId: function makeId(name) {
    return "#" + this.props.idNum.toString();
  },
  render: function render() {
    return React.createElement(
      "a",
      { "data-toggle": "collapse", "data-parent": "#accordion", href: this.makeId(this.props.idNum) },
      this.props.name
    );
  }
});

var Ingredients = React.createClass({
  displayName: "Ingredients",

  render: function render() {
    var ls = this.props.ingList.map(function (ingredient) {
      return React.createElement(
        "div",
        { className: "checkbox" },
        React.createElement(
          "label",
          null,
          React.createElement(
            "input",
            { className: "large", type: "checkbox", value: "" },
            ingredient
          )
        )
      );
    });
    return React.createElement(
      "form",
      null,
      React.createElement(
        "h4",
        null,
        "Ingredients:"
      ),
      ls
    );
  }
});

React.render(React.createElement(RecipeBox, { items: items }), document.getElementById("myDiv"));