export class Event {
  public readonly id?: number;
  public readonly name: string;
  public readonly date: string;
  public readonly description?: string | null;
  public readonly place?: string | null;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  private constructor(props: {
    id?: number;
    name: string;
    date: string; // YYYY-MM-DDTHH:MM:SS
    description?: string | null;
    place?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.date = props.date;
    this.description = props.description ?? null;
    this.place = props.place ?? null;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  public static create(props: {
    id?: number;
    name: string;
    date: string;
    description?: string | null;
    place?: string | null;
  }): Event {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error('Name is required');
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
    if (!props.date || !dateRegex.test(props.date)) {
      throw new Error('Date must be in format YYYY-MM-DDTHH:MM:SS');
    }

    return new Event({
      id: props.id,
      name: props.name,
      date: props.date,
      description: props.description ?? null,
      place: props.place ?? null,
    });
  }

  public static fromPrimitives(props: {
    id?: number;
    name: string;
    date: string;
    description?: string | null;
    place?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }): Event {
    return new Event({
      id: props.id,
      name: props.name,
      date: props.date,
      description: props.description ?? null,
      place: props.place ?? null,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      date: this.date,
      description: this.description,
      place: this.place,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
