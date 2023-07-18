import { act } from 'react-dom/test-utils';
import { useStore } from './useStore';

describe('useStore', () => {
  beforeEach(() => {
    // Reset the store state after each test
    useStore.setState((state) => ({
      ...state,
      user: null,
      isLoading: false,
    }));
  });

  test('initial state', () => {
    const store = useStore.getState();

    expect(store.user).toBeNull();
    expect(store.isLoading).toBe(false);
  });

  test('setUser action', () => {
    const newUser = {
      name: 'Omri',
      email: 'omri`@gmail.com',
      password: 'Omri1234',
    };

    act(() => {
      useStore.getState().setUser(newUser);
    });

    const store = useStore.getState();

    expect(store.user).toBe(newUser);
  });

  test('setIsLoading action', () => {
    act(() => {
      useStore.getState().setIsLoading(true);
    });

    const store = useStore.getState();

    expect(store.isLoading).toBe(true);
  });
});
