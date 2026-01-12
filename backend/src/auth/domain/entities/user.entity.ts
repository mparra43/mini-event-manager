import * as bcrypt from 'bcrypt';

export class User {
  public readonly id?: number;
  public readonly name: string;
  public readonly email: string;
  private password: string; // hashed password
  public readonly createdAt?: Date;

  private constructor(props: {
    id?: number;
    name: string;
    email: string;
    password: string; // hashed
    createdAt?: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt;
  }

  // Factory method: receives raw password and returns a User with hashed password
  public static async create(props: {
    id?: number;
    name: string;
    email: string;
    password: string; // raw password
    createdAt?: Date;
  }): Promise<User> {
    if (!props.name || props.name.trim().length < 1) {
      throw new Error('Name is required');
    }

    if (!props.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(props.email)) {
      throw new Error('Invalid email');
    }

    if (!props.password || props.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const saltRounds = 10;
    const hashed = await bcrypt.hash(props.password, saltRounds);

    return new User({
      id: props.id,
      name: props.name,
      email: props.email.toLowerCase(),
      password: hashed,
      createdAt: props.createdAt,
    });
  }

  // For reconstructing entity from storage when password is already hashed
  public static fromPrimitives(props: {
    id?: number;
    name: string;
    email: string;
    password: string; // hashed
    createdAt?: Date;
  }): User {
    if (!props.name || !props.email || !props.password) {
      throw new Error('Invalid user data');
    }

    return new User({
      id: props.id,
      name: props.name,
      email: props.email,
      password: props.password,
      createdAt: props.createdAt,
    });
  }

  // Compare raw password against stored hash
  public async comparePassword(plain: string): Promise<boolean> {
    return bcrypt.compare(plain, this.password);
  }

  // Expose safe representation
  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
    };
  }

  // Only for persistence layer that needs hashed password
  public getHashedPassword(): string {
    return this.password;
  }
}
