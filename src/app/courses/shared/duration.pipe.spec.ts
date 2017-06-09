import { DurationPipe } from './duration.pipe';

describe('TestSuite for DurationPipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  let durationPipe = new DurationPipe();
  it('should transform duration value less than 60 in "{duration} min" string', () => {
    expect(durationPipe.transform(55)).toBe('55 min');
  });
  it('should transform duration value greater than 60 in {h "h" mm "min"} string', () => {
    expect(durationPipe.transform(200)).toBe('3 h 20 min');
  });

});
