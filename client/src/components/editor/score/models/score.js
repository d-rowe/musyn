class Score {
  constructor(measures) {
    this.length = measures * 4;
    this.notes = {};
  }

  notesAtIndex(beatIndex) {
    const notes = this.notes[beatIndex];

    if (notes !== undefined) {
      return notes;
    }

    return [];
  }

  hasNoteAtIndex(notename, beatIndex) {
    const notes = this.notes[beatIndex];

    if (notes === undefined) return false;

    return notes.includes(notename);
  }

  addNote(notename, beatIndex) {
    const notes = this.notes[beatIndex];

    if (notes === undefined) {
      this.notes[beatIndex] = [notename];
      return true;
    }

    if (this.hasNoteAtIndex(notename, beatIndex)) {
      return false;
    }

    notes.push(notename);
    return true;
  }

  removeNote(notename, beatIndex) {
    const noteIndex = this.notes[beatIndex].indexOf(notename);

    if (noteIndex !== -1) {
      this.notes[beatIndex].splice(noteIndex, 1);
      return true;
    }

    return false;
  }
}

export default Score;
