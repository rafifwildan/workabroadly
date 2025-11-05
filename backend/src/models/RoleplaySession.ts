import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUserChoice {
  sceneOrder: number;       // urutan scene (1, 2, 3, ...)
  selectedOption: string;   // teks jawaban yang dipilih user
  note?: string;            // catatan feedback dari pilihan itu
}

export interface IRoleplaySession extends Document {
  progressId: Types.ObjectId;   // referensi ke UserProgress
  scenarioId: Types.ObjectId;   // referensi ke RoleplayScenario
  answers: IUserChoice[];       // kumpulan jawaban user
  completed: boolean;
  startedAt: Date;
  endedAt?: Date;
}

const UserChoiceSchema = new Schema<IUserChoice>({
  sceneOrder: { type: Number, required: true },
  selectedOption: { type: String, required: true },
  note: String,
});

const RoleplaySessionSchema = new Schema<IRoleplaySession>(
  {
    progressId: {
      type: Schema.Types.ObjectId,
      ref: "UserProgress",
      required: true,
    },
    scenarioId: {
      type: Schema.Types.ObjectId,
      ref: "RoleplayScenario",
      required: true,
    },
    answers: { type: [UserChoiceSchema], default: [] },
    completed: { type: Boolean, default: false },
    startedAt: { type: Date, default: Date.now },
    endedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model<IRoleplaySession>(
  "RoleplaySession",
  RoleplaySessionSchema
);
