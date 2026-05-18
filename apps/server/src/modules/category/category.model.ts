import { Schema, Types, model } from "mongoose";

export interface CategoryDocument {
  _id: Types.ObjectId;
  restaurant: Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<CategoryDocument>(
  {
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const CategoryModel = model<CategoryDocument>("Category", categorySchema);

