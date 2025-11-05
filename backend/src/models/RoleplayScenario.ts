import mongoose, { Schema, Document } from "mongoose";

// ============================================================
// 🧩 Option Schema
// ============================================================
export interface IScenarioOption {
  text: string;        // teks pilihan yang muncul di UI
  note: string;        // catatan / feedback langsung setelah user memilih
}

const OptionSchema = new Schema<IScenarioOption>({
  text: { type: String, required: true },
  note: { type: String, required: true },
});

// ============================================================
// 🎬 Scene Schema
// ============================================================
export interface IScenarioScene {
  order: number;       // urutan scene (1, 2, 3, ...)
  title: string;       // judul singkat scene (e.g. "The First Meeting")
  situation: string;   // deskripsi konteks (narasi situasi)
  dialogue: string;    // ucapan karakter lain / latar
  options: IScenarioOption[]; // daftar opsi jawaban user
  insight: string;     // insight budaya / penjelasan setelah memilih
}

const SceneSchema = new Schema<IScenarioScene>({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  situation: { type: String, required: true },
  dialogue: { type: String, required: true },
  options: { type: [OptionSchema], default: [] },
  insight: { type: String, required: true },
});

// ============================================================
// 🧭 Brief Schema
// ============================================================
export interface IScenarioBrief {
  overview: string;             // deskripsi singkat skenario
  context: string;              // konteks budaya atau profesional
  culturalTips: string[];       // daftar tips singkat
  learningObjectives: string[]; // hal-hal yang akan dipelajari
}

const BriefSchema = new Schema<IScenarioBrief>({
  overview: { type: String, required: true },
  context: { type: String, required: true },
  culturalTips: { type: [String], default: [] },
  learningObjectives: { type: [String], default: [] },
});

// ============================================================
// 🌏 Roleplay Scenario Schema (root)
// ============================================================
export interface IRoleplayScenario extends Document {
  title: string;                // judul penuh skenario
  culture: "japanese" | "korean"; // budaya yang disimulasikan
  location: string;             // lokasi setting (e.g. "indonesia")
  language: string;             // bahasa utama (e.g. "english")
  brief: IScenarioBrief;        // brief sebelum simulasi dimulai
  scenes: IScenarioScene[];     // urutan langkah-langkah interaksi
  createdAt: Date;              // tanggal pembuatan
  updatedAt: Date;              // tanggal update terakhir
}

const RoleplayScenarioSchema = new Schema<IRoleplayScenario>(
  {
    title: { type: String, required: true },
    culture: { type: String, enum: ["japanese", "korean"], required: true },
    location: { type: String, default: "indonesia" },
    language: { type: String, default: "english" },
    brief: { type: BriefSchema, required: true },
    scenes: { type: [SceneSchema], default: [] },
  },
  { timestamps: true } // otomatis buat createdAt & updatedAt
);

// ============================================================
// ✅ Export Model
// ============================================================
export default mongoose.model<IRoleplayScenario>(
  "RoleplayScenario",
  RoleplayScenarioSchema
);
