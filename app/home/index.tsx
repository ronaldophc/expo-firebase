import { Stack } from "expo-router";
import { Alert, FlatList, Text, TextInput, View } from "react-native";

import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import StyledButton from "../../components/StyledButton";
import useCollection from "../../firebase/hooks/useCollection";
import globalStyles from "../../styles/globalStyles";
import Pokemon from "../../types/Pokemon";
import ViewPokemon from "../../components/ViewPokemon";
import { useState } from "react";

export default function Home() {
    const { data, create, remove, refreshData, loading } =
        useCollection<Pokemon>("pokemons");

    const [type1, setType1] = useState("");
    const [type2, setType2] = useState("");
    const [name, setName] = useState("");

    return (
        <View style={globalStyles.container}>
            <Stack.Screen
                options={{
                    title: "Home",
                    headerStyle: {
                        backgroundColor: "#fdf0d5",
                    },
                    headerRight: () => <HeaderRight />,
                }}
            />

            <TextInput
                style={globalStyles.input}
                placeholder="Name"
                placeholderTextColor="#fdf0d5"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Tipo 1"
                placeholderTextColor="#fdf0d5"
                value={type1}
                onChangeText={setType1}
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Tipo 2"
                placeholderTextColor="#fdf0d5"
                value={type2}
                onChangeText={setType2}
            />

            <StyledButton
                title="Criar Pokemon"
                onPress={async () => {
                    if (!type1 || !name || !type2) {
                        Alert.alert(
                            "Error",
                            "Por favor preencha todos os campos."
                        );
                        return;
                    }
                    try {
                        await create({
                            name: name,
                            type1: type1,
                            type2: type2,
                        });

                        await refreshData();
                    } catch (error: any) {
                        Alert.alert("Create Pokemon error", error.toString());
                    }
                }}
                style={{ marginBottom: 12 }}
            />

            <Text style={ globalStyles.title }>Seus Pokemons</Text>

            {loading ? (
                <Loading />
            ) : (
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <ViewPokemon
                            pokemon={item}
                            onDelete={async () => {
                                await remove(item.id!);
                                await refreshData();
                            }}
                        />
                    )}
                    style={{ width: "100%" }}
                />
            )}
        </View>
    );
}
