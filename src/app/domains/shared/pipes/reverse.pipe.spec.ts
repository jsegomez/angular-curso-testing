import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator/jest';
import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  let spectator: SpectatorPipe<ReversePipe>;
  const createPipe = createPipeFactory({
    pipe: ReversePipe,
    template: `{{ value | reverse }}`,
  });

  it('should reverse a simple string', () => {
    spectator = createPipe({ hostProps: { value: 'hola' } });
    spectator.detectChanges();
    expect(spectator.element).toHaveText('aloh');
  });

  it('should return empty string unchanged', () => {
    spectator = createPipe({ hostProps: { value: '' } });
    spectator.detectChanges();
    expect(spectator.element).toHaveText('');
  });

  it('should handle single character', () => {
    spectator = createPipe({ hostProps: { value: 'x' } });
    spectator.detectChanges();
    expect(spectator.element).toHaveText('x');
  });

  it('should reverse a sentence with spaces', () => {
    spectator = createPipe({ hostProps: { value: 'hello world' } });
    spectator.detectChanges();
    expect(spectator.element).toHaveText('dlrow olleh');
  });

  it('should preserve special characters', () => {
    spectator = createPipe({ hostProps: { value: 'a b!' } });
    spectator.detectChanges();
    expect(spectator.element).toHaveText('!b a');
  });
});
