describe('sample test 101', () => {
  it('should work', function() {
    const value = 100;
    expect(1).toEqual(1);
    expect(value).toEqual(100)
  });

  it('should fine', () => {
    const age = 200;
    expect(age).toBeGreaterThan(100)
  });

  it('should array containe text', () => {
    const dogs = ['bobo', 'jesi', 'locky'];
    expect(dogs).toEqual(dogs);
    expect('bobo').toContain('bobo');
  });
});
