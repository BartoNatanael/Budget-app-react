const notificationsMiddleware = () => next => action => {
    if(/(.*)_(SUCCESS)/.test(action.type)){
        //wyświetl notyfikację
        console.log({action})
    };

    next(action);
};

export default notificationsMiddleware;