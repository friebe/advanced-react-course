import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import formatMoney from "../lib/formatMoney";
import gql from "graphql-tag";
import Router from "next/router";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

export default class CreateItem extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 0
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              // Stop the form from submitting
              e.preventDefault();
              // call the mutation
              const res = await createItem();
              // change them to the single item page
              Router.push({
                pathname: "/item",
                query: { id: res.data.createItem.id }
              });
            }}
          >
            <Error error={error} />
            <h2>Sell an Item</h2>
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  name="title"
                  type="text"
                  placeholder="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  required
                ></input>
              </label>

              <label htmlFor="description">
                Description
                <input
                  name="description"
                  type="text"
                  placeholder="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  required
                ></input>
              </label>

              <label htmlFor="image">
                Image
                <input
                  name="image"
                  type="file"
                  placeholder="image"
                  value={this.state.image}
                  onChange={this.handleChange}
                ></input>
              </label>

              <label htmlFor="largeImage">
                Large Image
                <input
                  name="largeImage"
                  type="file"
                  placeholder="largeImage"
                  value={this.state.largeImage}
                  onChange={this.handleChange}
                ></input>
              </label>

              <label htmlFor="price">
                Price
                <input
                  name="price"
                  type="number"
                  placeholder="0"
                  value={this.state.price}
                  onChange={this.handleChange}
                  required
                ></input>
              </label>
            </fieldset>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

//export { CREATE_ITEM_MUTATION };
