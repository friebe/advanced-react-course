import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { cloudinary } from "../variables";
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
    //coerce string into floatingnumber because all inputs from input is a string type
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    const files = e.target.files;
    console.log(files[0]);
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits");

    console.log(cloudinary);

    const res = await fetch(cloudinary, {
      method: "POST",
      body: data
    });

    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
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
                  name="file"
                  type="file"
                  placeholder="image"
                  //value={this.state.image}
                  onChange={this.uploadFile}
                ></input>
              </label>

              {this.state.image && (
                <img src={this.state.image} alt="preview image" />
              )}

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

export { CREATE_ITEM_MUTATION };
