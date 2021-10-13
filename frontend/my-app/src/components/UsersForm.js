import { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";

const UsersForm = (props) => {
  const [user, setUser] = useState({ ...props.user });

  useEffect(() => {
    setUser({ ...props.user });
  }, [props.user]);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  if (props.showDetails) {
    return (
      <Form {...layout}>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 20 }}>
          <Button
            style={{ paddingLeft: 2, textAlign: "center" }}
            onClick={props.closeAction}
          >
            Close
          </Button>
        </Form.Item>
        {(user.nameFirst || user.nameLast) && (
          <>
            <Form.Item label="First Name:">
              <Input placeholder={user.nameFirst} disabled={true} />
            </Form.Item>
            <Form.Item label="Last Name:">
              <Input placeholder={user.nameLast} disabled={true} />
            </Form.Item>
          </>
        )}
        <Form.Item label="Email:">
          <Input placeholder={user.email} disabled={true} />
        </Form.Item>
        <Form.Item label="Type:">
          <Input placeholder={user.type} disabled={true} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button
            style={{ paddingLeft: 2, textAlign: "center" }}
            onClick={() => props.promoteAction(user.id)}
          >
            Promote
          </Button>
          <Button
            style={{ paddingLeft: 2, textAlign: "center" }}
            onClick={() => props.controlAction(user.id)}
          >
            Control
          </Button>
          <Button
            style={{ paddingLeft: 2, textAlign: "center" }}
            onClick={() => props.deleteAction(user.id)}
          >
            Delete
          </Button>
        </Form.Item>
      </Form>
    );
  } else {
    return (
      <Form {...layout}>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 20 }}>
          <Button
            style={{ paddingLeft: 2, textAlign: "center" }}
            onClick={props.closeAction}
          >
            Close
          </Button>
        </Form.Item>
        <Form.Item label="email:">
          <Input
            placeholder={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button
            style={{ paddingLeft: 2, textAlign: "center" }}
            onClick={() => props.registerAction(user)}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
};

export default UsersForm;
