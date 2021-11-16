import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { coins } from "../api";
import { BLACK_COLOR } from "../colors";

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${BLACK_COLOR};
`;
const Coin = styled.View`
  align-items: center;
`;
const CoinName = styled.Text`
  color: white;
`;
const CoinSymbol = styled.Text`
  color: white;
`;

const Home = () => {
  const { isLoading, data } = useQuery("coins", coins);
  const [cleanData, setCleanData] = useState();
  useEffect(() => {
    setCleanData(
      data?.filter((coin) => coin.rank != 0 && coin.is_active && !coin.is_new)
    );
  }, [data]);
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator color="white" size="large" />
      </Loader>
    );
  }
  return (
    <Container>
      <FlatList
        numColumns={5}
        data={cleanData}
        renderItem={({ item }) => (
          <Coin>
            <CoinName>{item.name}</CoinName>
            <CoinSymbol>{item.symbol}</CoinSymbol>
          </Coin>
        )}
      />
    </Container>
  );
};

export default Home;
