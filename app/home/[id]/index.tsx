import { faker } from "@faker-js/faker";
import { Stack, useGlobalSearchParams } from "expo-router";
import { Alert, Text, TextInput, View } from "react-native";

import HeaderRight from "../../../components/HeaderRight";
import Loading from "../../../components/Loading";
import StyledButton from "../../../components/StyledButton";
import useDocument from "../../../firebase/hooks/useDocument";
import globalStyles from "../../../styles/globalStyles";
import Pokemon from "../../../types/Pokemon";
import { useState } from "react";
import useCollection from "../../../firebase/hooks/useCollection";

export default function PokemonDetails() {
  const { id } = useGlobalSearchParams();

  const {
    data: pokemon,
    loading,
    upsert,
  } = useDocument<Pokemon>("pokemons", id as string);

  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [name, setName] = useState("");

  if (loading && pokemon) {
    if (type1 !== pokemon.type1) setType1(pokemon.type1);
    if (type2 !== pokemon.type2) setType2(pokemon.type2);
    if (name !== pokemon.name) setName(pokemon.name);
  }

  if (loading || !pokemon) return <Loading />;

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: pokemon.name,
          headerStyle: {
            backgroundColor: "#fdf0d5",
          },
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>{pokemon.name}</Text>

      <Text style={{...globalStyles.simpleText}}>id: {pokemon.id}</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Name"
        placeholderTextColor= "#fdf0d5"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Type 1"
        placeholderTextColor= "#fdf0d5"
        value={type1}
        onChangeText={setType1}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Type 2"
        placeholderTextColor= "#fdf0d5"
        value={type2}
        onChangeText={setType2}
      />

      <StyledButton
        title="Atualizar"
        onPress={async () => {
          try {
            await upsert({
              ...pokemon,
              name,
              type1,
              type2,
            });

            Alert.alert("Update Pokemon", "Pokemon updated successfully!");
          } catch (error: any) {
            Alert.alert("Update Pokemon error", error.toString());
          }
        }}
      />
    </View>
  );
}
