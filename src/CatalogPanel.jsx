/* eslint-disable require-jsdoc */
import React, { useEffect, useRef, useState } from 'react';
import {
  Badge,
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from 'reactstrap';

import './CatalogPanel.css';

const TYPE_LABEL = {
  election_stream: '開票',
  election_page: '待公布',
  news_fallback: '新聞台',
  custom: '自訂',
};

const TYPE_COLOR = {
  election_stream: 'danger',
  election_page: 'secondary',
  news_fallback: 'info',
  custom: 'success',
};

const positionsFor = (item, channelUrls) => {
  if (!item.url) return [];
  const positions = [];
  channelUrls.slice(0, 9).forEach((url, index) => {
    if (url === item.url) positions.push(index + 1);
  });
  return positions;
};

const CatalogPanel = ({
  isOpen,
  toggle,
  items,
  channelUrls,
  failedUrls = {},
  onPlace,
  onAutoPlace,
  onAdd,
  onRemove,
}) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(null);
  const listRef = useRef(null);
  const customCount = items.filter((item) => item.custom).length;
  const previousCustomCount = useRef(customCount);

  useEffect(() => {
    if (customCount > previousCustomCount.current && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
    previousCustomCount.current = customCount;
  }, [customCount]);

  const addItem = (event) => {
    event.preventDefault();
    const nextName = name.trim();
    const nextUrl = url.trim();
    if (!nextName) {
      setError('請輸入名稱');
      return;
    }
    if (!/^https?:\/\//i.test(nextUrl)) {
      setError('網址需要以 http:// 或 https:// 開頭');
      return;
    }
    onAdd({ name: nextName, url: nextUrl });
    setName('');
    setUrl('');
    setError('');
  };

  return (
    <Offcanvas
      isOpen={isOpen}
      toggle={toggle}
      direction="end"
      className="catalog-panel text-bg-dark"
    >
      <OffcanvasHeader toggle={toggle}>
        2026 九合一大選
      </OffcanvasHeader>
      <OffcanvasBody className="catalog-body">
        <p className="catalog-hint">
          點一個頻道，在九宮格裡選擇位置。沒有網址的台尚未公布影片。
        </p>
        <div className="catalog-auto">
          <Button
            color="primary"
            size="sm"
            className="w-100"
            disabled={!items.some((item) => item.available && item.url && !failedUrls[item.url])}
            onClick={onAutoPlace}
          >
            自動放入九宮格
          </Button>
        </div>
        <div className="catalog-scroll" ref={listRef}>
          {items.map((item) => {
            const positions = positionsFor(item, channelUrls);
            const linkUnavailable = !item.available || Boolean(item.url && failedUrls[item.url]);
            return (
              <div className={item.custom ? 'catalog-row is-custom' : 'catalog-row'} key={item.id}>
                <button
                  type="button"
                  className="catalog-item"
                  disabled={!item.available}
                  onClick={() => setPending(item)}
                >
                  <span className="catalog-item-title">
                    <Badge color={TYPE_COLOR[item.streamType] || 'secondary'}>
                      {TYPE_LABEL[item.streamType] || item.streamType}
                    </Badge>
                    <span className="catalog-item-name">{item.name}</span>
                  </span>
                  {item.notes ? <small>{item.notes}</small> : null}
                  {!item.available ? <small>尚無影片網址，暫時不能放入</small> : null}
                </button>
                {positions.length > 0 ? (
                  <span className="catalog-positions" aria-label={`九宮格位置 ${positions.join('、')}`}>
                    {positions.map((position) => (
                      <span className="catalog-position" key={position}>
                        {position}
                        {linkUnavailable ? (
                          <span className="catalog-url-badge">無連結</span>
                        ) : null}
                      </span>
                    ))}
                  </span>
                ) : null}
                {positions.length === 0 && !item.available ? (
                  <span className="catalog-positions">
                    <span className="catalog-url-badge is-standalone">無連結</span>
                  </span>
                ) : null}
                {item.custom ? (
                  <button
                    type="button"
                    className="catalog-remove"
                    onClick={() => onRemove(item.id)}
                  >
                    移除
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
        <Modal
          isOpen={Boolean(pending)}
          toggle={() => setPending(null)}
          centered
          contentClassName="place-dialog"
        >
          <ModalHeader toggle={() => setPending(null)}>
            {pending ? `放入「${pending.name}」` : '選擇位置'}
          </ModalHeader>
          <ModalBody>
            <div className="place-grid">
              {Array.from({ length: 9 }, (_, index) => {
                const slotUrl = channelUrls[index];
                const occupied = pending && slotUrl === pending.url;
                const unavailable = Boolean(slotUrl && failedUrls[slotUrl]);
                return (
                  <button
                    key={index}
                    type="button"
                    className={occupied ? 'place-cell is-current' : 'place-cell'}
                    onClick={() => {
                      onPlace(pending, index);
                      setPending(null);
                    }}
                  >
                    {index + 1}
                    {unavailable ? (
                      <span className="catalog-url-badge">無連結</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </ModalBody>
        </Modal>
        <Form className="catalog-add" onSubmit={addItem}>
          <div className="catalog-add-title">新增項目</div>
          <Input
            className="mb-2"
            bsSize="sm"
            placeholder="名稱"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            className="mb-2"
            bsSize="sm"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
          {error ? <div className="catalog-error">{error}</div> : null}
          <Button color="primary" size="sm" type="submit">
            新增
          </Button>
        </Form>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default CatalogPanel;
