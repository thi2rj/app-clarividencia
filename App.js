// Importar os módulos necessários
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView, Linking, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';


// Carregar as fontes personalizadas
Font.loadAsync({
  'Roboto-Bold': Roboto_700Bold,
  'Roboto-Regular': Roboto_400Regular,
});

// Definir as cores e fontes para o estilo do aplicativo
const colors = {
  primary: '#4a148c',
  secondary: '#ff6f00',
  white: '#ffffff',
  black: '#000000',
  gray: '#cccccc',
};

const fonts = {
  regular: 'Roboto',
  bold: 'Roboto-Bold',
};

// Definir o componente da página inicial
const HomeScreen = ({ navigation }) => {
  // Definir os estados para o nome e a idade do usuário
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  // Definir a função para salvar os dados do usuário no armazenamento do smartphone
  const saveData = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('age', age);
      navigation.navigate('Main');
    } catch (error) {
      alert(error);
    }
  };

  // Definir a função para validar os dados do usuário e entrar no aplicativo
  const enterApp = () => {
    if (name && age) {
      saveData();
    } else {
      alert('Por favor, preencha o nome e a idade.');
    }
  };

  // Retornar o elemento da página inicial
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao aplicativo de clarividência</Text>
      <Text style={styles.label}>Digite o seu nome:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ex: João"
      />
      <Text style={styles.label}>Digite a sua idade:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Ex: 25"
        keyboardType="numeric"
      />
      <Button
        title="Entrar no app"
        color={colors.primary}
        onPress={enterApp}
      />
    </View>
  );
};

// Definir o componente da página principal
const MainScreen = ({ navigation }) => {
  // Definir o estado para o nome do usuário
  const [name, setName] = useState('');

  // Definir a função para obter os dados do usuário do armazenamento do smartphone
  const getData = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      if (name) {
        setName(name);
      }
    } catch (error) {
      alert(error);
    }
  };

  // Chamar a função quando o componente for montado
  useEffect(() => {
    getData();
  }, []);

  // Definir a função para abrir o site no navegador padrão do smartphone
  const openSite = () => {
    Linking.openURL('https://ebrapu.com');
  };

  // Retornar o elemento da página principal
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {name}!</Text>
      <Text style={styles.text}>Acesse o site <Text style={styles.link} onPress={openSite}>ebrapu.com</Text></Text>
      <ScrollView style={styles.scroll}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dicas')}>
          <Text style={styles.buttonText}>Dicas de clarividência</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Exercícios')}>
          <Text style={styles.buttonText}>Exercícios de clarividência</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Diário')}>
          <Text style={styles.buttonText}>Diário de clarividência</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Definir o componente da página de dicas de clarividência
const TipsScreen = ({ navigation }) => {
  // Definir o texto com as dicas para desbloquear a clarividência
  const tips = `A clarividência é a capacidade de ver imagens mentais, símbolos, cores, formas ou cenas que não estão fisicamente presentes. É uma forma de percepção extra-sensorial que pode ser desenvolvida com prática e dedicação. Aqui estão algumas dicas para desbloquear a sua clarividência:

  - Medite regularmente. A meditação é uma forma de acalmar a mente e aumentar a sua concentração e intuição. Você pode meditar com os olhos fechados ou abertos, focando na sua respiração, em um mantra, em uma vela, em um cristal ou em qualquer outro objeto que te ajude a relaxar.
  - Limpe e equilibre o seu chakra do terceiro olho. O chakra do terceiro olho é o centro energético localizado entre as suas sobrancelhas, que está relacionado à visão, à imaginação, à intuição e à clarividência. Você pode limpar e equilibrar esse chakra usando técnicas como a respiração, a visualização, a afirmação, o reiki, a aromaterapia, a cromoterapia ou a cristaloterapia. Escolha um método que te agrade e faça-o regularmente.
  - Pratique a visualização. A visualização é a capacidade de criar imagens mentais com detalhes e clareza. Você pode praticar a visualização usando exercícios como imaginar um lugar que você conhece bem, um objeto que você gosta, uma pessoa que você admira, uma cor que você prefere ou uma forma geométrica simples. Tente visualizar essas coisas com o máximo de detalhes possível, usando todos os seus sentidos. Faça isso por alguns minutos todos os dias e observe como as suas imagens mentais ficam mais nítidas e vivas.
  - Confie na sua intuição. A intuição é a voz da sua alma, que te guia e te orienta através de impressões, sensações, sentimentos, pensamentos ou imagens. Você pode desenvolver a sua intuição prestando atenção aos seus insights, aos seus sonhos, às suas sincronicidades, aos seus pressentimentos e às suas coincidências. Não duvide ou ignore esses sinais, mas siga-os com confiança e curiosidade. Eles podem te levar a descobrir novas informações, oportunidades, soluções ou perspectivas.
  - Divirta-se. A clarividência é uma habilidade natural que todos nós possuímos em maior ou menor grau. Não se leve muito a sério ou se frustre se as coisas não acontecerem do jeito que você espera. Lembre-se de que a clarividência é uma forma de brincar com a sua imaginação e de explorar o seu potencial criativo. Divirta-se com o processo e aproveite as surpresas que ele pode te trazer.`;

  // Retornar o elemento da página de dicas de clarividência
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dicas de clarividência</Text>
      <ScrollView style={styles.scroll}>
        <Text style={styles.text}>{tips}</Text>
      </ScrollView>
      <Button
        title="Voltar"
        color={colors.secondary}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

// Definir o componente da página de exercícios de clarividência
const ExercisesScreen = ({ navigation }) => {
  // Definir o texto com os exercícios práticos do básico ao avançado para desbloquear a clarividência e a leitura psíquica
  const exercises = `A clarividência é uma habilidade que pode ser aprimorada com a prática de exercícios específicos que estimulam a sua visão interna e a sua conexão com o campo energético. Aqui estão alguns exercícios práticos do básico ao avançado para desbloquear a sua clarividência e a sua leitura psíquica:

  - Exercício básico: Olhe para uma parede branca ou para o céu e observe os pontos luminosos, as cores, as formas ou as sombras que aparecem na   sua visão periférica. Esses são os seus fótons, as partículas de luz que compõem a matéria. Tente focar neles sem piscar ou desviar o olhar. Você pode perceber padrões, movimentos ou mudanças de cor. Esse exercício ajuda a ativar o seu terceiro olho e a expandir a sua consciência.

  - Exercício intermediário: Pegue um baralho de cartas e embaralhe-o bem. Escolha uma carta aleatoriamente e coloque-a na sua testa, com a face voltada para fora. Não olhe para a carta, mas tente adivinhar o seu naipe e o seu valor. Você pode usar a sua intuição, a sua lógica ou a sua visualização para fazer isso. Depois de fazer o seu palpite, verifique se você acertou. Repita esse exercício quantas vezes quiser, tentando aumentar a sua precisão e a sua confiança. Esse exercício ajuda a desenvolver a sua leitura psíquica e a sua percepção extra-sensorial.

  - Exercício avançado: Peça a um amigo ou familiar para ser o seu parceiro nesse exercício. Peça para ele se sentar à sua frente, em um lugar tranquilo e confortável. Olhe nos olhos dele e tente captar as suas emoções, pensamentos, personalidade ou intenções. Você pode fazer perguntas abertas ou fechadas para confirmar as suas impressões. Você também pode tentar ver a aura dele, que é o campo energético que envolve o seu corpo. A aura pode ter diferentes cores, formas, tamanhos e significados. Esse exercício ajuda a aprimorar a sua clarividência e a sua empatia.`;

  // Retornar o elemento da página de exercícios de clarividência

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercícios de clarividência</Text>
      <ScrollView style={styles.scroll}>
        <Text style={styles.text}>{exercises}</Text>
      </ScrollView>
      <Button
        title="Voltar"
        color={colors.secondary}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

// Definir o componente da página do diário de clarividência
const DiaryScreen = ({ navigation }) => {
  // Definir o estado para a lista de anotações
  const [notes, setNotes] = useState([]);

  // Definir a função para obter as anotações do armazenamento do smartphone
  const getNotes = async () => {
    try {
      const notes = await AsyncStorage.getItem('notes');
      if (notes) {
        setNotes(JSON.parse(notes));
      }
    } catch (error) {
      alert(error);
    }
  };

  // Chamar a função quando o componente for montado
  useEffect(() => {
    getNotes();
  }, []);

  // Definir a função para formatar a data e a hora
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleString('pt-BR', options);
  };

  // Retornar o elemento da página do diário de clarividência
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diário de clarividência</Text>
      <ScrollView style={styles.scroll}>
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <TouchableOpacity key={index} style={styles.note} onPress={() => navigation.navigate('Nota', { note })}>
              <Text style={styles.noteTitle}>{note.title}</Text>
              <Text style={styles.noteDate}>{formatDate(note.date)}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.text}>Você ainda não tem nenhuma anotação. Clique no botão abaixo para criar uma.</Text>
        )}
      </ScrollView>
      <Button
        title="Criar anotação"
        color={colors.primary}
        onPress={() => navigation.navigate('Nota')}
      />
      <Button
        title="Voltar"
        color={colors.secondary}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

// Definir o componente da página de uma anotação
const NoteScreen = ({ route, navigation }) => {
  // Definir os estados para o título, o texto, a imagem, o áudio e a data da anotação
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [date, setDate] = useState(new Date());

  // Definir o estado para a lista de anotações
  const [notes, setNotes] = useState([]);

  // Definir o estado para o objeto de gravação de áudio
  const [recording, setRecording] = useState(null);

  // Definir a função para obter as anotações do armazenamento do smartphone
  const getNotes = async () => {
    try {
      const notes = await AsyncStorage.getItem('notes');
      if (notes) {
        setNotes(JSON.parse(notes));
      }
    } catch (error) {
      alert(error);
    }
  };

  // Definir a função para salvar as anotações no armazenamento do smartphone
  const saveNotes = async (notes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      alert(error);
    }
  };

  // Definir a função para salvar a anotação atual
  const saveNote = () => {
    const note = { title, text, image, audio, date };
    const index = notes.findIndex((n) => n.date === note.date);
    if (index >= 0) {
      notes[index] = note;
    } else {
      notes.push(note);
    }
    saveNotes(notes);
    navigation.goBack();
  };

  // Definir a função para deletar a anotação atual
  const deleteNote = () => {
    const note = { title, text, image, audio, date };
    const index = notes.findIndex((n) => n.date === note.date);
    if (index >= 0) {
      notes.splice(index, 1);
    }
    saveNotes(notes);
    navigation.goBack();
  };

  // Definir a função para pedir permissão para acessar a câmera e a galeria do smartphone
  const askPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissão para acessar a câmera e a galeria.');
    }
  };

  // Definir a função para escolher uma imagem da galeria do smartphone
  const pickImage = async () => {
    await askPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Definir a função para tirar uma foto com a câmera do smartphone
  const takePhoto = async () => {
    await askPermission();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Definir a função para iniciar a gravação de áudio
  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
    } catch (error) {
      alert(error);
    }
  };

  // Definir a função para parar a gravação de áudio
  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudio(uri);
      setRecording(null);
    } catch (error) {
      alert(error);
    }
  };

  // Chamar a função quando o componente for montado
  useEffect(() => {
    getNotes();
    if (route.params && route.params.note) {
      const { title, text, image, audio, date } = route.params.note;
      setTitle(title);
      setText(text);
      setImage(image);
      setAudio(audio);
      setDate(date);
    }
  }, []);

  // Retornar o elemento da página de uma anotação
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Anotação</Text>
      <ScrollView style={styles.scroll}>
        <Text style={styles.label}>Título:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Ex: Minha primeira visão"
        />
        <Text style={styles.label}>Texto:</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Ex: Hoje eu vi um anjo..."
          multiline
        />
        <Text style={styles.label}>Imagem:</Text>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.text}>Nenhuma imagem selecionada.</Text>
          )}
        </View>
        <View style={styles.imageButtons}>
          <Button
            title="Escolher da galeria"
            color={colors.primary}
            onPress={pickImage}
          />
          <Button
            title="Tirar uma foto"
            color={colors.primary}
            onPress={takePhoto}
          />
        </View>
        <Text style={styles.label}>Áudio:</Text>
        <View style={styles.audioContainer}>
          {audio ? (
            <Audio.Sound
              source={{ uri: audio }}
              useNativeControls
              isLooping
            />
          ) : (
            <Text style={styles.text}>Nenhum áudio gravado.</Text>
          )}
        </View>
        <View style={styles.audioButtons}>
          <Button
            title="Iniciar gravação"
            color={colors.primary}
            onPress={startRecording}
            disabled={recording}
          />
          <Button
            title="Parar gravação"
            color={colors.primary}
            onPress={stopRecording}
            disabled={!recording}
          />
        </View>
      </ScrollView>
      <Button
        title="Salvar"
        color={colors.primary}
        onPress={saveNote}
      />
      <Button
        title="Deletar"
        color={colors.secondary}
        onPress={deleteNote}
      />
      <Button
        title="Voltar"
        color={colors.secondary}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

// Definir o componente de navegação do aplicativo
const AppNavigator = () => {
  // Definir as opções de navegação

// Definir o componente principal do aplicativo
const App = () => {
  // Retornar o elemento principal
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

// Criar uma instância do componente Stack
const Stack = createStackNavigator();

// Definir o componente de navegação do aplicativo

  // Retornar o elemento de navegação 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={options} // Passar a variável options
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ ...options, title: 'Principal' }}
        />
        <Stack.Screen
          name="Dicas"
          component={TipsScreen}
          options={{ ...options, title: 'Dicas de clarividência' }}
        />
        <Stack.Screen
          name="Exercícios"
          component={ExercisesScreen}
          options={{ ...options, title: 'Exercícios de clarividência' }}
        />
        <Stack.Screen
          name="Diário"
          component={DiaryScreen}
          options={{ ...options, title: 'Diário de clarividência' }}
        />
        <Stack.Screen
          name="Nota"
          component={NoteScreen}
          options={{ ...options, title: 'Anotação' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Importar o módulo AppRegistry do react-native
import { AppRegistry } from 'react-native';

// Definir o componente App
const App = () => {
  // Retornar o elemento principal
  return (
    
      <AppNavigator />
    
  );
};



// Registrar o componente App com o nome "main"
AppRegistry.registerComponent('main', () => App);

// Definir as opções de navegação
const options = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTintColor: colors.white,
  headerTitleStyle: {
    fontFamily: fonts.bold,
  },
};

// Definir o estilo do aplicativo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.black,
    margin: 10,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.black,
    margin: 10,
  },
  input: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    padding: 10,
    width: '90%',
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: colors.black,
    margin: 10,
  },
  link: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  scroll: {
    width: '100%',
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
  note: {
    backgroundColor: colors.gray,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },
  noteTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.black,
  },
  noteDate: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.black,
  },
  imageContainer: {
    width: '90%',
    height: 200,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
  audioContainer: {
    width: '90%',
    height: 100,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
  },
});

// Exportar o componente principal do aplicativo
export default App;