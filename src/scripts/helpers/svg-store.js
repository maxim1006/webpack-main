const requireAll = (r) => {
    r.keys().forEach(r);
};

requireAll(require.context('../../images/svg/', true, /\.svg$/));
