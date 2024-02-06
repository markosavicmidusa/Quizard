import mongoose from "mongoose";

// QuizMetadataSchema start
const QuizMetadataSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    createdBy: { type: String, required: true },
    timesClicked: { type: Number, required: true }
});
const QuizMetadataModel = mongoose.model('QuizMetadata', QuizMetadataSchema)

export default QuizMetadataModel
