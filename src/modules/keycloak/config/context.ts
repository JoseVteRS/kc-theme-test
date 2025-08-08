import { getKcContext } from 'keycloakify-test';
import type { KcContextBase } from './context-base';

// Check if we're in debug mode (window.kcContext is not available)
const isDebugMode = !(window as any).kcContext;

// Use either the real kcContext from window or the debug context
export const { kcContext } = isDebugMode
    ? getKcContext<{
          pageId: 'login.ftl';
      }>({
          mockPageId: 'login.ftl',
          mockData: [
              {
                  pageId: 'login.ftl',
              },
          ],
      })
    : { kcContext: (window as any).kcContext as KcContextBase.Login };

export type KcContext = NonNullable<typeof kcContext>;
