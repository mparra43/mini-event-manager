export class Event {
  id: number;
  name: string;
  date: Date;
  description?: string;
  place?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    name: string,
    date: Date,
    description?: string,
    place?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.description = description;
    this.place = place;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}
