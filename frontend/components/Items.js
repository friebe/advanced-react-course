import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Item from "./Item";
import styled from "styled-components";
import Error from "./ErrorMessage";

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
`;

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

class Items extends Component {
  render() {
    return (
      <div>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <Error error={error}></Error>;
            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item key={item.id} item={item}></Item>
                ))}
              </ItemsList>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Items;
