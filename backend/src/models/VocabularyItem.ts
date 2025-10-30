import mongoose, { Schema, Document } from "mongoose";

export interface IVocabularyItem extends Document {
  userId: string;
  word: string;
  meaning: string;
  language: "japanese" | "korean";
  example?: string;
  mastered: boolean;
  addedFrom?: string;
  createdAt: Date;
}

const VocabularySchema = new Schema<IVocabularyItem>({
  userId: { type: String, required: true },
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  language: { type: String, enum: ["japanese", "korean"], required: true },
  example: String,
  mastered: { type: Boolean, default: false },
  addedFrom: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IVocabularyItem>("VocabularyItem", VocabularySchema);
