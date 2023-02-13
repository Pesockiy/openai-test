import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./index.module.scss";

import { Container, Row, Col, Button, Form } from "react-bootstrap";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: text }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setText("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }



  return (
    <Container className="py-5 w-50">
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>
      <Row>
        <Col lg={6}>
          <Form onSubmit={onSubmit}>
            <Form.Control
              type="text"
              name="animal"
              placeholder="Введи чето шоп сгенерить чето"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form>
        </Col>
        <Col lg={4}>
          <Button variant="danger" type="submit" onClick={onSubmit}>сгенерировать</Button>
        </Col>
      </Row>
      <Row className="py-4">
        <Col>{result}</Col>
      </Row>
    </Container >
  );
}
