var serverData = require('../server-data/data');

const getStickyNotes = () => {
    return serverData.stickyNote.notes;
}

const getLayouts = () => {
    return serverData.stickyNote.layouts;
}

const handleLayoutChange = (layouts) => {
    serverData.stickyNote.changeLayouts(layouts);
}

const handleAddStickyNote = (i) => {
    serverData.stickyNote.addStickyNote(i);
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
    getStickyNotes: () => getStickyNotes(),
    getLayouts: () => getLayouts(),
    handleLayoutChange: (layouts) => handleLayoutChange(layouts),
    handleAddStickyNote: (i) => handleAddStickyNote(i),
    handleDeleteStickyNote: (note) => handleDeleteStickyNote(note),
    handleEditStickyNoteTitle: (note, title) => handleEditStickyNoteTitle(note, title),
    handleEditStickyNoteText: (note, text) => handleEditStickyNoteText(note, text)
}