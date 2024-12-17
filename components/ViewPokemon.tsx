import { useRouter } from "expo-router";
import { Alert, Text, View } from "react-native";

import StyledButton from "./StyledButton";
import Pokemon from "../types/Pokemon";
import globalStyles from "../styles/globalStyles";

interface ViewPokemonProps {
  pokemon: Pokemon;
  onDelete: Function;
}

export default function ViewPokemon({ pokemon, onDelete }: ViewPokemonProps) {
  const router = useRouter();

  return (
    <View
      style={{ borderTopColor: "#fdf0d5", borderTopWidth: 1, marginTop: 12 }}
    >
      <Text style={{...globalStyles.simpleText}}>id: {pokemon.id}</Text>
      <Text style={{...globalStyles.simpleText}}>Nome: {pokemon.name}</Text>
      <Text style={{...globalStyles.simpleText}}>Tipo 1: {pokemon.type1}</Text>
      <Text style={{...globalStyles.simpleText}}>Tipo 2: {pokemon.type2}</Text>

      <View style={{ flexDirection: "row", gap: 2 }}>
        <StyledButton
          title="Editar pokemon"
          onPress={() => {
            if (pokemon.id) {
              router.push(`/home/${pokemon.id}/`);
            } else {
              Alert.alert(
                "View error",
                "cannot access pokemon details because it does not have an id!"
              );
            }
          }}
          style={{ width: "50%" }}
        />

        <StyledButton
          title="Deletar"
          onPress={() => {
            if (pokemon.id) {
              Alert.alert("Delete pokemon", "Are you sure?", [
                {
                  text: "Yes",
                  onPress: async () => {
                    onDelete();
                  },
                },
                {
                  text: "No",
                  style: "cancel",
                },
              ]);
            } else {
              Alert.alert(
                "delete error",
                "cannot delete pokemon because it does not have an id!"
              );
            }
          }}
          style={{ width: "50%", backgroundColor: "darkred" }}
        />
      </View>
    </View>
  );
}
