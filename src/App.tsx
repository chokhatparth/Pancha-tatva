/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ElementPage } from './pages/ElementPage';
import { TopicPage } from './pages/TopicPage';
import {
  ComparePage,
  LibraryPage,
  QuizPage,
  ReferencesPage,
  AboutPage,
  ContactPage,
  NotFoundPage,
} from './pages/SecondaryPages';
import { getElementBySlug, getTopicBySlug } from './data/panchaTatvaData';
import { speechEngine } from './services/speechEngine';

function normalizePath(rawPath: string): string {
  const withoutPrefix = rawPath.replace(/^\/pancha-tatva(?=\/|$)/, '') || '/';
  if (withoutPrefix.length > 1 && withoutPrefix.endsWith('/')) {
    return withoutPrefix.slice(0, -1);
  }
  return withoutPrefix;
}

function toBrowserUrl(normalizedPath: string): string {
  if (normalizedPath === '/') {
    return '/pancha-tatva';
  }
  return `/pancha-tatva${normalizedPath}`;
}

export default function App() {
  const [path, setPath] = useState<string>(() =>
    normalizePath(window.location.pathname)
  );

  useEffect(() => {
    // Ensure initial browser URL shows /pancha-tatva as requested
    const targetUrl = toBrowserUrl(path);
    if (window.location.pathname !== targetUrl) {
      window.history.replaceState({}, '', targetUrl);
    }

    const onPopState = () => {
      setPath(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (to: string) => {
    const clean = normalizePath(to);
    speechEngine.stop();
    setPath(clean);
    window.history.pushState({}, '', toBrowserUrl(clean));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (path === '/') {
      document.title = 'Pancha Tatva — Discover the Five Elements of Existence';
    } else if (path === '/about') {
      document.title = 'About the Research Project — Pancha Tatva';
    } else if (path === '/compare') {
      document.title = 'Compare the Five Elements — Pancha Tatva';
    } else if (path === '/contact') {
      document.title = 'Contact & Feedback — Pancha Tatva';
    } else if (path === '/library') {
      document.title = 'Research Library — Pancha Tatva';
    } else if (path === '/quiz') {
      document.title = 'Pancha Tatva Knowledge Quiz';
    } else if (path === '/references') {
      document.title = 'References & Bibliography — Pancha Tatva';
    } else if (path.startsWith('/elements/')) {
      const slug = path.replace('/elements/', '');
      const el = getElementBySlug(slug);
      document.title = el
        ? `${el.sanskrit} (${el.english}) — Pancha Tatva Research`
        : 'Element not found — Pancha Tatva';
    } else if (path.startsWith('/topics/')) {
      const slug = path.replace('/topics/', '');
      const topic = getTopicBySlug(slug);
      document.title = topic
        ? `${topic.title} — Pancha Tatva`
        : 'Topic not found — Pancha Tatva';
    } else {
      document.title = 'Pancha Tatva — The Five Elements of Existence';
    }
  }, [path]);

  const renderRoute = () => {
    if (path === '/') {
      return <HomePage navigate={navigate} />;
    }
    if (path === '/compare') {
      return <ComparePage navigate={navigate} />;
    }
    if (path === '/library') {
      return <LibraryPage navigate={navigate} />;
    }
    if (path === '/quiz') {
      return <QuizPage />;
    }
    if (path === '/references') {
      return <ReferencesPage />;
    }
    if (path === '/about') {
      return <AboutPage />;
    }
    if (path === '/contact') {
      return <ContactPage />;
    }
    if (path.startsWith('/elements/')) {
      const slug = path.replace('/elements/', '');
      return <ElementPage slug={slug} navigate={navigate} />;
    }
    if (path.startsWith('/topics/')) {
      const slug = path.replace('/topics/', '');
      return <TopicPage slug={slug} navigate={navigate} />;
    }
    return <NotFoundPage navigate={navigate} />;
  };

  return (
    <Layout currentPath={path} navigate={navigate}>
      {renderRoute()}
    </Layout>
  );
}
