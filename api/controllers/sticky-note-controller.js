var serverData = require('../server-data/data');

const handleAddStickyNote = () => {
    serverData.stickyNote.addStickyNote();
}

const handleDeleteStickyNote = (note) => {
    serverData.stickyNote.deleteStickyNote(note);
}

const handleEditStickyNoteTitle = (note, title) => {
    serverData.stickyNote.editStickyNoteTitle(note, title);
}

const handleEditStickyNoteText = (note, text) => {
    serverData.stickyNote.editStickyNoteText(note, text);
}

module.exports = {
    handleAddStickyNote: () => handleAddStickyNote(),
    handleDeleteStickyNote: (note) => handleDeleteStickyNote(note),
    handleEditStickyNoteTitle: (note, title) => handleEditStickyNoteTitle(note, title),
    handleEditStickyNoteText: (note, text) => handleEditStickyNoteText(note, text),
}