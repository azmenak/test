import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Main = ({ connections, lastConnection, ownConnectionKey }) => (
  <div>
    <h1>Connected IPs <small>({connections.size})</small></h1>
    <ul>
      {connections.entrySeq().map(([key, ip]) =>
        <li key={key}>{ip} { key === ownConnectionKey && <strong>This Connection</strong>}</li>
      )}
    </ul>

    <h2>Last Connected User</h2>
    <p>{lastConnection}</p>
  </div>
);

Main.propTypes = {
  connections: PropTypes.object,
  lastConnection: PropTypes.string,
  ownConnectionKey: PropTypes.string,
};

const mapStateToProps = state => state.get('data').toObject();

export default connect(mapStateToProps)(Main);
