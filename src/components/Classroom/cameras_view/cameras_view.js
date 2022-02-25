import React from 'react';
import { connect } from 'react-redux';
import CameraView from './camera_view';

const CamerasView = (props) => {
  let key = 13;
  const cameras = props.participants.map((element, index) => {
    key += 1;
    if (index) {
      return (
        <CameraView
          unAuthName={props.studentName}
          className="student_cam"
          mic={props.mic}
          video={props.video}
          participantName={element}
          seatNumber={index}
          key={key}
        />
      );
    } else {
      return (
        <CameraView
          onProfessorPress={props.onProfessorClick}
          className="professor_cam"
          participantName={element}
          seatNumber={index}
          key={key}
        />
      );
    }
  });
  return (
    <div className="cameras_view">
      {cameras}
    </div>
  );
};

const mapStateToProps = (state) => ({
  participants: state.classroom.participants,
});

export default connect(mapStateToProps, null)(CamerasView);
