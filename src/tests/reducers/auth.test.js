import authReducer from '../../reducers/auth';

test('should log in with a user id', () => {
    const action = {
        type: 'LOGIN',
        uid: '123'
    }
    const state = authReducer({}, action);
    expect(state.uid).toEqual(action.uid);
});

test('should clear uid for logout', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({ uid: '123' }, action);
    expect(state).toEqual({});
});