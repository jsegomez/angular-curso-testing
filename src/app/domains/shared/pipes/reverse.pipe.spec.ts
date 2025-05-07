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

  it('should handle empty string', () => {
    spectator = createPipe({ hostProps: { value: '' } });
    spectator.detectChanges();
    expect(spectator.element).toHaveText('');
  });

  it('should handle palindrome', () => {
    spectator = createPipe({ hostProps: { value: 'radar' } });
    spectator.detectChanges();
    expect(spectator.element).toHaveText('radar');
  });

  it('should handle string with spaces', () => {
    spectator = createPipe({ hostProps: { value: 'hello world' } });
    spectator.detectChanges();
    expect(spectator.element).toHaveText('dlrow olleh');
  });

  it('should handle string with special characters', () => {
    spectator = createPipe({ hostProps: { value: 'hello!!!' } });
    spectator.detectChanges();
    expect(spectator.element).toHaveText('!!!olleh');
  });
});
