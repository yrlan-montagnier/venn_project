import { Button, View, Text, StyleSheet, FlatList } from "react-native";

import useGetAll from "../hooks/useGetAll";
import Project from "./Project";
import useRotationColor from "../hooks/useRotationColor";

function Projects({ navigation, firstname, lastname }) {
  const color = useRotationColor();
  const { loading, error, data } = useGetAll("projects");
  const CreateProject = () => {
    navigation.navigate("CreateProject");
  };
  if (loading) {
    return (
      <View style={styles.root}>
        <Text>Chargement...</Text>
      </View>
    );
  }
  if (error || !data?.length > 0) {
    return (
      <View style={styles.root}>
        <Text>
          Il n'y aucun projet. Cliquez sur le bouton pour créer le premier !
        </Text>
        <View style={styles.actions}>
          <Button title="Créer un projet" onPress={CreateProject} />
        </View>
      </View>
    );
  }
  const renderItem = ({ item }) => <Project {...item} />;
  return (
    <View style={styles.root}>
      <FlatList
        style={styles.flatlist}
        data={data}
        renderItem={renderItem}
        keyExtractor={(project) => project.id}
      />
      <View style={styles.actions}>
        <Button title="Créer un projet" onPress={CreateProject} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 64,
  },
  actions: {
    padding: 10,
    alignSelf: "center",
  },
});

export default Projects;
