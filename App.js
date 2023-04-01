import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  StatusBar as NativeStatusBar,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "./components/Header";
import Note from "./components/Note";
import NotesList from "./components/NotesList";
import SearchBar from "./components/SearchBar";
import MainMenu from "./components/MainMenu";
import CustomModal from "./components/CustomModal";

const MAX_HISTORY_LENGTH = 16;
const MONTHS = [
  "Sty",
  "Lut",
  "Mar",
  "Kwi",
  "Maj",
  "Cze",
  "Lip",
  "Sie",
  "Wrz",
  "Paź",
  "Lis",
  "Gru",
];
const WEEK_DAYS = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];

// eas build --profile production --platform android

export default function App() {
  const [visibleNotes, setVisibileNotes] = useState("notes");
  const [isAction, setIsAction] = useState(false);
  const [query, setQuery] = useState("");

  const [highlightedNote, setHighlightedNote] = useState(null);

  const [notes, setNotes] = useState([]);

  // set initial notes when opening
  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem("notes");
        if (value !== null) {
          // We have data!!
          setNotes(JSON.parse(value));
        }
      } catch (error) {
        console.log(error);
        console.log("Error fetching data from local storage");
      }
    };
    fetchData();
  }, []);

  // save notes to local storage
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("notes", JSON.stringify(notes));
      } catch (error) {
        console.log(error);
        console.log("Error saving data to local storage");
      }
    };
    saveData();
  }, [notes]);

  const createNoteHandler = () => {
    const title = `Nowa notka #${Math.floor(Math.random() * 99 + 1)}`;

    const date = new Date();
    const dateMonth = MONTHS[date.getMonth()];
    const dateDay = date.getDate();
    const dateYear = date.getFullYear().toString().slice(-2);
    const dateWeekDay = WEEK_DAYS[date.getDay()];

    const noteDate = `${dateWeekDay}, ${dateDay} ${dateMonth} ${dateYear}`;

    const newNote = {
      title: title,
      text: "Twoja nowa notka!",
      id: Math.random(),
      type: "note",
      isSelected: false,
      history: [
        {
          title: title,
          text: "Twoja nowa notka!",
        },
      ],
      currentHistory: 0,
      date: noteDate,
    };

    setNotes((notes) => [...notes, newNote]);
    setVisibileNotes("notes");
  };

  const restoreNotesHandler = () => {
    setNotes((notes) =>
      [...notes].map((note) => {
        if (note.isSelected) note.type = "note";
        return note;
      })
    );

    changeIsActionHandler(false);
  };

  const deleteNotesHandler = () => {
    if (visibleNotes === "notes") {
      setNotes((notes) =>
        [...notes].map((note) => {
          if (note.isSelected) note.type = "deleted";
          return note;
        })
      );
    }

    if (visibleNotes === "deleted") {
      setNotes((notes) => [
        ...notes.filter((note) => {
          if (note.type === "note") return true;
          return !note.isSelected;
        }),
      ]);
    }

    changeIsActionHandler(false);
  };

  const editNoteHandler = (editedNote, editHistory) => {
    setNotes((notes) => [
      ...notes.map((currentNote) => {
        if (currentNote.id !== editedNote.id) return currentNote;

        // if user updated after going back in history then reset history
        if (currentNote.currentHistory !== currentNote.history.length - 1) {
          const slicedHistory = currentNote.history.slice(
            0,
            currentNote.currentHistory + 1
          );

          currentNote.history = slicedHistory;
          return currentNote;
        }

        // prevent from history being extremely long, limit is set at MAX_HISTORY_LENGTH
        if (currentNote.currentHistory >= MAX_HISTORY_LENGTH) {
          currentNote.history.shift();
          currentNote.currentHistory -= 1;
        }
        // push current state before updating note
        currentNote.history.push({
          text: currentNote.text,
          title: currentNote.title,
        });
        // update note
        currentNote.title = editedNote.title;
        currentNote.text = editedNote.text;
        // add to history tracker
        currentNote.currentHistory = currentNote.currentHistory + 1;
        return currentNote;
      }),
    ]);
  };

  const changePlaceInHistoryHandler = (noteID, historyDirection) => {
    setNotes((notes) => [
      ...notes.map((curNote) => {
        if (curNote.id !== noteID) return curNote;

        // check if move in history is possible
        if (
          curNote.currentHistory + historyDirection < 0 ||
          curNote.currentHistory + historyDirection > MAX_HISTORY_LENGTH ||
          curNote.currentHistory + historyDirection > curNote.history.length - 1
        )
          return curNote;

        // move history then update note
        curNote.currentHistory += historyDirection;
        curNote.text = curNote.history[curNote.currentHistory].text;
        curNote.title = curNote.history[curNote.currentHistory].title;

        return curNote;
      }),
    ]);
  };

  const changeIsActionHandler = (changedIsAction, selectedNoteId) => {
    setIsAction(changedIsAction);

    setNotes((notes) =>
      [...notes].map((note) => {
        note.isSelected = false;
        return note;
      })
    );

    if (selectedNoteId)
      setNotes((notes) => [
        ...notes.map((note) => {
          if (note.id === selectedNoteId) note.isSelected = true;
          return note;
        }),
      ]);
  };

  const selectAllHandler = (alreadySelected) => {
    setNotes((notes) => [
      ...notes.map((note) => {
        return { ...note, isSelected: !alreadySelected };
      }),
    ]);
  };

  const changeSelectedHandler = (newValue, selectedNoteID) => {

    setNotes((notes) => [
      ...notes.map((note) => {
        if (note.id === selectedNoteID) note.isSelected = newValue;
        return note;
      }),
    ]);
  };

  const changeVisibleNotesHandler = () =>
    setVisibileNotes(visibleNotes === "notes" ? "deleted" : "notes");

  const changeQueryHandler = (newQuery) => {
    setQuery(newQuery);
  };

  const changeHiglightedNoteHandler = (note) => {
    setHighlightedNote(note);
  };

  const notesToPass =
    visibleNotes === "notes"
      ? [...notes.filter((note) => note.type === "note")]
      : [...notes.filter((note) => note.type === "deleted")];

  // count all of the selected notes
  const numberOfSelectedNotes = notesToPass.reduce(
    (curVal, note) => (note.isSelected ? curVal + 1 : curVal),
    0
  );

  return (
    <Pressable style={styles.main} onPress={() => setIsAction(false)}>
      {highlightedNote && (
        <CustomModal
          onRequestClose={() => setHighlightedNote(null)}
          onChangePlaceInHistory={changePlaceInHistoryHandler}
          note={highlightedNote}
        >
          <Note note={highlightedNote} onEditNote={editNoteHandler}></Note>
        </CustomModal>
      )}
      {/* <Header></Header> */}
      <SearchBar onChangeQuery={changeQueryHandler}></SearchBar>
      <NotesList
        notes={notesToPass}
        title={visibleNotes === "notes" ? "Twoje notatki" : "Kosz"}
        query={query}
        onChangeIsAction={changeIsActionHandler}
        onChangeSelected={changeSelectedHandler}
        onSetHighlightedNote={changeHiglightedNoteHandler}
        isAction={isAction}
        onSelectAll={selectAllHandler}
        numberOfSelectedNotes={numberOfSelectedNotes}
      ></NotesList>
      <MainMenu
        onCreateNote={createNoteHandler}
        isAction={isAction}
        onChangeVisibleNotes={changeVisibleNotesHandler}
        onDeleteNotes={deleteNotesHandler}
        onRestoreNotes={restoreNotesHandler}
        visibleNotes={visibleNotes}
        numberOfSelectedNotes={numberOfSelectedNotes}
      ></MainMenu>
      <StatusBar style="auto" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f8f8f8",
    width: "100%",
    height: "100%",
    padding: 15,
  },
});
