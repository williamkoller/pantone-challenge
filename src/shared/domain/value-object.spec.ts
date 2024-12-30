import { ValueObject } from './value-object';
class ConcreteValueObject extends ValueObject<{ name: string; age: number }> {
  constructor(props: { name: string; age: number }) {
    super(props);
  }
}

describe('ValueObject', () => {
  it('should create a ValueObject with given properties', () => {
    const vo = new ConcreteValueObject({ name: 'John', age: 30 });

    expect(vo.props).toEqual({ name: 'John', age: 30 });
  });

  it('should return true when comparing equal ValueObjects', () => {
    const vo1 = new ConcreteValueObject({ name: 'John', age: 30 });
    const vo2 = new ConcreteValueObject({ name: 'John', age: 30 });

    expect(vo1.equals(vo2)).toBe(true);
  });

  it('should return false when comparing different ValueObjects', () => {
    const vo1 = new ConcreteValueObject({ name: 'John', age: 30 });
    const vo2 = new ConcreteValueObject({ name: 'Jane', age: 25 });

    expect(vo1.equals(vo2)).toBe(false);
  });

  it('should return false when comparing with null', () => {
    const vo = new ConcreteValueObject({ name: 'John', age: 30 });

    expect(vo.equals(null)).toBe(false);
  });

  it('should return false when comparing with undefined', () => {
    const vo = new ConcreteValueObject({ name: 'John', age: 30 });

    expect(vo.equals(undefined)).toBe(false);
  });

  it('should return false when comparing with another object type', () => {
    const vo = new ConcreteValueObject({ name: 'John', age: 30 });
    const obj = { name: 'John', age: 30 };

    expect(vo.equals(obj as any)).toBe(false);
  });

  it('should return true when comparing the same instance of ValueObject', () => {
    const vo = new ConcreteValueObject({ name: 'John', age: 30 });

    expect(vo.equals(vo)).toBe(true);
  });
});
