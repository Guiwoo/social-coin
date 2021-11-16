import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { coins } from "../api";
import { BLACK_COLOR } from "../colors";
import Coin from "../component/Coin";

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
const List = styled.FlatList`
  padding: 20px 10px;
  width: 100%;
  flex: 1;
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
      <List
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        numColumns={3}
        data={cleanData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Coin index={index} id={item.id} symbol={item.symbol} />
        )}
      />
    </Container>
  );
};

export default Home;
